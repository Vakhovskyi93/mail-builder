import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
const list = [
  {
    path: `assets/images/logo.svg`,
    name: 'logo',
  },
  {
    path: `assets/images/logOut.svg`,
    name: 'logOut',
  },
  {
    path: `assets/images/edit.svg`,
    name: 'edit',
  },
  {
    path: `assets/images/eye.svg`,
    name: 'eye',
  },
  {
    path: `assets/images/facebook.svg`,
    name: 'facebook',
  },
  {
    path: `assets/images/linkedin.svg`,
    name: 'linkedin',
  },
  {
    path: `assets/images/mail.svg`,
    name: 'mail',
  },
  {
    path: `assets/images/send.svg`,
    name: 'send',
  },
  {
    path: `assets/images/trash.svg`,
    name: 'trash',
  },
  {
    path: `assets/images/update.svg`,
    name: 'update',
  },
  {
    path: `assets/images/arrow_down.svg`,
    name: 'arrow_down',
  },
  {
    path: `assets/images/letter_logo.svg`,
    name: 'letter_logo',
  },
];
export default function printIcon(
  matIconRegistry: MatIconRegistry,
  domSanitizer: DomSanitizer
) {
  for (const i in list) {
    matIconRegistry.addSvgIcon(
      list[i].name,
      domSanitizer.bypassSecurityTrustResourceUrl(list[i].path)
    );
  }
}
