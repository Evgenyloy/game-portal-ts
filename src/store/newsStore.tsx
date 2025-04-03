import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "./createSelectors ";
import { INews } from "../types/types";

type NewsState = {
  selectedNews: INews;
  setNews: (news: INews) => void;
};

const newsBaseStore = create<NewsState>()(
  devtools(
    persist(
      immer((set) => ({
        selectedNews: localStorage.getItem("news")
          ? JSON.parse(localStorage.getItem("news") || "")
          : {},
        setNews: (news) => {
          set((state) => {
            state.selectedNews = news;
          });
        },
      })),
      { name: "news-storage" }
    ),
    { name: "newsState" }
  )
);

export const newsStore = createSelectors(newsBaseStore);
