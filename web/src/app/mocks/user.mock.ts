import {companyMock} from "./company.mock";
import {documentMock} from "./document.mock";

export const userMock = {
  id: 0,
  email: 'teste@teste.com',
  password_reseted_at: '2023-10-11',
  verified_email: false,
  password: '123456',
  created_at: '2023-10-11',
  updated_at: '2023-10-11',
  company: companyMock,
  documents: [documentMock],
}
