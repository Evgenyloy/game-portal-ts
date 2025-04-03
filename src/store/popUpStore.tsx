import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, devtools } from "zustand/middleware";
import { createSelectors } from "./createSelectors ";

type PopUpStore = {
  popUpVisible: boolean;
  setPopUp: () => void;
};

const popUpBaseStore = create<PopUpStore>()(
  devtools(
    persist(
      immer((set) => ({
        popUpVisible: false,
        setPopUp: () => {
          set((state) => {
            state.popUpVisible = !state.popUpVisible;
          });
        },
      })),
      { name: "popUp-storage" }
    ),
    { name: "popUpStore" }
  )
);

export const popUpStore = createSelectors(popUpBaseStore);
