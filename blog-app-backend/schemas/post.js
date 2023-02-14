export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date',
    },
    {
      name: 'body',
      type: 'string',
      title: 'Body',
    },
  ],
}
