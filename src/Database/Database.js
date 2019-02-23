const fetcher = require('./fetcher');

export default class Database {
  constructor(url) {
    this.url = url
  }

  static normalizeSingle(data) {
    data.date = new Date(data.date);
    return data
  }

  normalize(data) {
    data.forEach(el => Database.normalizeSingle(el));
    return data
  }

  static dateToString(date) {
    return date.toISOString().substring(0, 10)
  }

  async get(url) {
    let resp = await fetcher.get(url);
    return this.normalize(resp)
  }

    async getById(id) {
        return await this.get(
            this.url + '?' + 'id=' + id
        )
    }

  async createFromJson(data) {
    let resp = await fetcher.post(this.url, data);
    return Database.normalizeSingle(resp)
  }

  async create(id, title, text, author) {
    return await this.createFromJson({
      id: id,
      title: title,
      content: text,
      date: Database.dateToString(new Date()),
      author: author,
    })
  }

  async update(id, data) {
    let resp = await fetcher.put(this.url + '/' + id, {
      title: data.title,
      content: data.content,
      date: Database.dateToString(new Date()),
      author: data.author,
    })
    return Database.normalizeSingle(resp)
  }

  async delete(id) {
    let resp = await fetcher.del(this.url + '/' + id)
    return Database.normalizeSingle(resp)
  }
}