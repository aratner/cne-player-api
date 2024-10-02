import { create } from "zustand";

type StoreState = {
  currentTime: number;
  currentEra: number;
  setCurrentTime: (time: number) => void;
};

const useStore = create<StoreState>((set) => ({
  currentTime: 0,
  currentEra: -1,
  setCurrentTime: (time) =>
    set((state) => {
      let newEra = state.currentEra;

      if (time >= 94) {
        newEra = 3;
      } else if (time >= 63) {
        newEra = 2;
      } else if (time >= 45) {
        newEra = 1;
      } else {
        newEra = 0;
      }

      console.log("Store update - Time:", time, "Era:", newEra);

      return {
        currentTime: time,
        currentEra: newEra,
      };
    }),
}));

export default useStore;
