import { ModifyCollectionObserver } from './collection-observation';

let setProto = Set.prototype;

export function getSetObserver(set: Set<any>) {
  return ModifySetObserver.for(set);
}

class ModifySetObserver extends ModifyCollectionObserver {
  constructor(set: Set<any>) {
    super(set);
  }

  /**
   * Searches for observer or creates a new one associated with given set instance
   * @param taskQueue
   * @param set instance for which observer is searched
   * @returns ModifySetObserver always the same instance for any given set instance
   */
  static for(set: Set<any> & { __set_observer__?: ModifySetObserver }) {
    if (!('__set_observer__' in set)) {
      Reflect.defineProperty(set, '__set_observer__', {
        value: ModifySetObserver.create(set),
        enumerable: false, configurable: false
      });
    }
    return set.__set_observer__;
  }

  static create(set: Set<any>) {
    let observer = new ModifySetObserver(set);

    let proto: any = setProto;
    if (proto.add !== set.add || proto.delete !== set.delete || proto.clear !== set.clear) {
      proto = {
        add: set.add,
        delete: set.delete,
        clear: set.clear
      };
    }

    set.add = function() {
      let type = 'add';
      let oldSize = set.size;
      let methodCallResult = proto.add.apply(set, arguments);
      let hasValue = set.size === oldSize;
      if (!hasValue) {
        observer.addChangeRecord({
          type: type,
          object: set,
          value: Array.from(set).pop()
        });
      }
      return methodCallResult;
    };

    set.delete = function() {
      let hasValue = set.has(arguments[0]);
      let methodCallResult = proto.delete.apply(set, arguments);
      if (hasValue) {
        observer.addChangeRecord({
          type: 'delete',
          object: set,
          value: arguments[0]
        });
      }
      return methodCallResult;
    };

    set.clear = function() {
      let methodCallResult = proto.clear.apply(set, arguments);
      observer.addChangeRecord({
        type: 'clear',
        object: set
      });
      return methodCallResult;
    };

    return observer;
  }
}
