export const feedQuery = `*[_type == "post"] {
  _id, 
  title,
  date,
  body
}`;
