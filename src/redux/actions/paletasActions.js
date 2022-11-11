import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig";
import { paletasTypes } from "../types/userTypes";

const collectionName = "paletas";

export const actionGetPaletasAsync = () => {
  return async (dispatch) => {
    const paletasCollection = collection(dataBase, collectionName);
    const querySnapshot = await getDocs(paletasCollection);
    const paletas = [];
    try {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        paletas.push({
          id: doc.id,
          ...doc.data(),
        });
        //   console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(actionGetPaletasSync(paletas));
    }
  };
};

const actionGetPaletasSync = (paletas) => {
  return {
    type: paletasTypes.PALETAS_GET,
    payload: {
      paletas: paletas,
    },
  };
};

export const actionAddPaletaAsync = (paleta) => {
  return async (dispatch) => {
    try {
      const paletasCollection = collection(dataBase, collectionName);
      const docs = await addDoc(paletasCollection, paleta);
      dispatch(actionAddPaletaSync({ id: docs.id, ...paleta }));
    } catch (error) {
      console.log(error);
      dispatch(actionAddPaletaSync({}));
    }
  };
};

const actionAddPaletaSync = (paleta) => {
  return {
    type: paletasTypes.PALETAS_ADD,
    payload: paleta,
  };
};

export const actionFilterPaletasAsync = (searchParam, searchValue) => {
  return async (dispatch) => {
    const paletasCollection = collection(dataBase, collectionName);
    const q = query(paletasCollection, where(searchParam, "==", searchValue));
    const paletas = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        paletas.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(actionFilterPaletasSync(paletas));
    }
  };
};

const actionFilterPaletasSync = (paletas) => {
  return {
    type: paletasTypes.PALETAS_FILTERED,
    payload: {
      paletas: paletas,
    },
  };
};


export const actionFilterAsync = (searchParam) => {
  return async (dispatch) => {
    const paletasCollection = collection(dataBase, collectionName);
    const querySnapshot = await getDocs(paletasCollection);
    const paletas = [];
    try {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        paletas.push({
          id: doc.id,
          ...doc.data(),
        });
        //   console.log(doc.id, " => ", doc.data());
      });
  
      const filterdPaletas = paletas.filter((item) =>
        item.name.toLowerCase().includes(searchParam.toLowerCase())
      );
      dispatch(actionFilterPaletasSync(filterdPaletas));
    } catch (error) {
      console.error(error);
      dispatch(actionFilterPaletasSync([]));
    }
  };
};
