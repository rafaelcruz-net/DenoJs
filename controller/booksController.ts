interface IBook {
  id: string;
  author: string;
  title: string;
  price: number;
}

let books: Array<IBook> = [
  {
    id: "1",
    author: "Robin Wieruch",
    title: "The road to React",
    price: 29.99,
  },
  {
    id: "2",
    author: "Unble Bob",
    title: "Clean Architect",
    price: 49.99,
  },
  {
    id: "3",
    author: "Erick Evans",
    title: "Domain Drive Design",
    price: 39.99,
  },
];

const getBooks = ({ response }: { response: any }) => {
  response.body = books;
};

const getBook = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const book: IBook | undefined = searchBookByid(params.id);
  if (book) {
    response.status = 200;
    response.body = book;
  } else {
    response.status = 404;
    response.body = { message: "Livro nao encontrado" };
  }
};

const addBook = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();
  const book: IBook = body.value;
  books.push(book);
  response.body = { message: "Created" };
  response.status = 201;
};

const updateBook = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const book: IBook | undefined = searchBookByid(params.id);
  if (book) {
    const body = await request.body();
    const updateInfo: IBook = body.value;
    books = [...books.filter((b) => b.id !== params.id)];
    books.push(updateInfo);
    response.body = { message: "OK" };
    response.status = 200;
  } else {
    response.body = { message: "Not Found" };
    response.status = 404;
  }
};

const deleteBook = (
  { params, response }: { params: { id: string }; response: any },
) => {
  books = books.filter((b) => b.id !== params.id);
  response.body = { message: "No Content" };
  response.status = 204;
};

const searchBookByid = (id: string): (IBook | undefined) =>
  books.filter((b) => b.id === id)[0];

export { getBooks, getBook, addBook, updateBook, deleteBook };
