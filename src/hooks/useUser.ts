import { User } from "firebase/auth";
import { useAtom, atom } from "jotai";

const userAtom = atom<User | null>(null);

export const useUser = () => {
    return useAtom(userAtom);
};
