import IParseMailTemplaateDTO from '../dtos/IParseMailTemplateDTO'

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplaateDTO): Promise<string>
}
