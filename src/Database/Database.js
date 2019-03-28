// @flow
import dateToString from '../helpers/dateToString'

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

  async get(url: string) {
    let resp = await fetcher.get(url)
    return this.normalize(resp)
  }

  async createFromJson(data: Object) {
    let resp = await fetcher.post(this.url, data)
    return Database.normalizeSingle(resp)
  }

  create = async (article: Object) => {
    const { id, title, content, author, tags, inLayout } = article
    const date = dateToString(new Date())
    return await this.createFromJson({
      id,
      title,
      content,
      date,
      author,
      tags,
      inLayout
    })
  }

  createInLayout = async (layout: Object) => {
    const { id, col, row, size } = layout
    return await this.createFromJson({
      id,
      col,
      row,
      size
    })
  }

  async update(id: string,
               {
                 title, content, author,
                 tags, date = dateToString(new Date()), inLayout
               }: Object) {
    let resp = await fetcher.put(this.url + '/' + id, {
      title,
      content,
      date,
      author,
      tags,
      inLayout
    })
    return Database.normalizeSingle(resp)
  }

  async updateInLayout(id: string, { col, row, size }: Object) {
    let resp = await fetcher.put(this.url + '/' + id, {
      col,
      row,
      size
    })
    return Database.normalizeSingle(resp)
  }

  async delete(id: string) {
    let resp = await fetcher.del(this.url + '/' + id)
    return Database.normalizeSingle(resp)
  }
}
