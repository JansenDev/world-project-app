import React, { useEffect, useState } from "react";
import { useParams } from "react-router-native";
import { LigthNovelVolume } from "../domain/models/volumeLigthNovel";
import volumeData from "../utils/chapters";

function useRepositoryVolume() {
    const { book_id = "", book_volume = "", book_pageNumber = "1" } = useParams();
  const [volumeFound, setVolumeFound] = useState<LigthNovelVolume | undefined>(
    undefined
  );

  const findBookVolume = async (
    bookId: number,
    volume: number,
    bookPageNumber: number
  ) => {
    const repositoryDB: LigthNovelVolume[] = volumeData;
    const dataPromise: Promise<LigthNovelVolume | undefined> = new Promise(
      (resolve, _) => {
        setTimeout(() => {
          const volumeFound = repositoryDB.find(
            (vol) => vol.volume === volume && vol.bookId === bookId
          )!;
          resolve(volumeFound);
        }, 1000);
      }
    );

    const data = await dataPromise;
    setVolumeFound(data!);
  };
  useEffect(() => {
    findBookVolume(
      Number(book_id),
      Number(book_volume),
      Number(book_pageNumber)
    );
  }, []);

  return { volumeFound };
}

export default useRepositoryVolume;
