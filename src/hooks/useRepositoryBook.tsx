import { useEffect, useState } from "react";
import { LigthNovel } from "../domain/models/ligthNovel";
const notFoundImage = require("../assets/not_found.jpg");
import data from "../utils/collections";

function useRepositoryBook(book_id: string) {
  const [bookImage, setBookImage] = useState<any>(notFoundImage);
  const [book, setBook] = useState<LigthNovel | undefined>(undefined);

  const findBook = async (id: string) => {
    const resultado = new Promise<LigthNovel>((resolve, _) => {
      setTimeout(() => {
        const result = data.find((book) => book.id === Number(id))!;
        resolve(result);
      }, 100);
    });
    const bookFound = await resultado;
    setBookImage({ uri: bookFound.image });
    setBook(bookFound);
  };

  useEffect(() => {
    findBook(book_id!);
  }, []);
  return { book, bookImage };
}

export default useRepositoryBook;
