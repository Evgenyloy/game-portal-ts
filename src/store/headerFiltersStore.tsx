import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, devtools } from "zustand/middleware";

export type HeaderFiltersState = {
  platform: string;
  category: string;
  sort: string;
  inputSearch: string;
};

export type HeaderFiltersActions = {
  setPlatform: (platform: string) => void;
  setCategory: (category: string) => void;
  setSort: (sort: string) => void;
  setInput: (input: string) => void;
};

export const useHeaderFiltersStore = create<
  HeaderFiltersState & HeaderFiltersActions
>()(
  devtools(
    persist(
      immer((set) => ({
        platform: "all",
        category: "mmorpg",
        sort: "relevance",
        inputSearch: "",

        setPlatform: (platform) => {
          set(
            (state) => {
              state.platform = platform;
            },
            false,
            "setPlatform"
          );
        },

        setCategory: (category) => {
          set(
            (state) => {
              state.category = category;
            },
            false,
            "setCategory"
          );
        },

        setSort: (sort) => {
          set(
            (state) => {
              state.sort = sort;
            },
            false,
            "setSort"
          );
        },

        setInput: (input) => {
          set((state) => {
            state.inputSearch = input;
          });
        },
      })),
      { name: "headerFilter-storage" }
    ),
    {
      name: "headerFilterStore",
      enabled: process.env.NODE_ENV !== "production",
    }
  )
);
