import { customElement } from '@aurelia/runtime';
import template from './app.html';
import { Camera, Zoom } from './molecules/specs-viewer/camera-specs-viewer';
import { Laptop, Storage } from './molecules/specs-viewer/laptop-specs-viewer';
import { User } from './molecules/user-preference/user-preference';
import { Thing } from './molecules/specs-viewer/thing-viewer';

type Contact = { number: number; type: string };

@customElement({ name: 'app', template })
export class App {
  private text1: string = 'text1';
  private text2: string = 'text2';
  private text3: string = 'text3';
  public text4: string = 'foo';
  public text5: string = 'bar';

  public inputOneTime: string = 'input1';
  public inputTwoWay: string = 'input2';
  public inputToView: string = 'input3';
  public inputFromView: string = 'input4';
  public inputBlrTw: string = 'input5';
  public inputBlrFv: string = 'input6';

  public things: Thing[] = [new Camera(new Zoom(40, 4), [125, 1600, 3200, 6400], [4, 16], [3, 6.5], 'Coolpix B500', 'Nikon'), new Laptop('Core i5 3.40 GHz', '8GB DDR4', new Storage('SSD', 1, 'TB'), '14 inch', 'T460', 'Lenovo')];

  public user: User = new User('John', 'Doe', 0.1, 'Role1', 'Org1', 'City1', 'Country1');

  public contacts1: Map<number, string> = new Map<number, string>([[123456790, 'mobile'], [9087654321, 'work'], [1122334455, 'home']]);
  public contacts2: Map<number, string> = new Map<number, string>(Array.from(this.contacts1));
  public chosenContact1: number = 9087654321;
  public chosenContact2: number = 9087654321;
  public contacts3: Contact[] = Array.from(this.contacts1).map(([number, type]) => ({ number, type }));
  public chosenContact3: Contact = this.contacts3[0];
  public contacts4: Contact[] = this.contacts3.slice(0);
  public chosenContact4: Contact = { number: 123456790, type: 'mobile' };
  public contacts5: Contact[] = this.contacts3.slice(0);
  public chosenContact5: Contact = { number: 123456790, type: 'mobile' };
  public matcher: (a: Contact, b: Contact) => boolean = (a: Contact, b: Contact) => a.type === b.type && a.number === b.number;

  public changeTexts() {
    this.text1 = 'newText1';
    this.text2 = 'newText2';
    this.text3 = 'newText3';
  }
}
