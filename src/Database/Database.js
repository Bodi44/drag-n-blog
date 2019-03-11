// @flow
const fetcher = require('./fetcher')

export default class Database {
  url: string

  constructor(url: string) {
    this.url = url
  }

  static normalizeSingle(data: Object) {
    data.date = new Date(data.date)
    return data
  }

  normalize(data: Object) {
    data.forEach(el => Database.normalizeSingle(el))
    return data
  }

  static dateToString(date: Date) {
    return date.toISOString().substring(0, 10)
  }

  async get(url: string) {
    let resp = await fetcher.get(url)
    return this.normalize(resp)
  }

  async createFromJson(data: Object) {
    let resp = await fetcher.post(this.url, data)
    return Database.normalizeSingle(resp)
  }

  create = async (article: Object) => {
    const { id, title, content, author, tags } = article
    const date = Database.dateToString(new Date())
    return await this.createFromJson({
      id,
      title,
      content,
      date,
      author,
      tags,
    })
  }

  async update(id: string, { title, content, author, tags }: Object) {
    let resp = await fetcher.put(this.url + '/' + id, {
      title,
      content,
      date: Database.dateToString(new Date()),
      author,
      tags,
    })
    return Database.normalizeSingle(resp)
  }

  async delete(id: string) {
    let resp = await fetcher.del(this.url + '/' + id)
    return Database.normalizeSingle(resp)
  }
}
