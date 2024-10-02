import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  // getFirmsSuccess,
  // getSalesSuccess,
  getStockSuccess,
} from "../features/stockSlice";
import useAxios from "./useAxios"

const useStockRequests = () => {
  // const { token } = useSelector((state) => state.auth);
  const {axiosToken} = useAxios()
  const dispatch = useDispatch();

  // const getFirms = async () => {
  //   dispatchEvent(fetchStart());
  //   try {
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}/firms`,
  //       {
  //         headers: { Authorization: `Token ${token}` },
  //       }
  //     );
  //     dispatch(getFirmsSuccess(data.data));
  //     console.log(data);
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     console.log(error);
  //   }
  // };


  // const getSales = async () => {
  //   dispatchEvent(fetchStart());
  //   try {
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}/sales`,
  //       {
  //         headers: { Authorization: `Token ${token}` },
  //       }
  //     );
  //     dispatch(getSalesSuccess(data.data));
  //     console.log(data);
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     console.log(error);
  //   }
  // };

  //   const getStock = async (path) => {
  //     dispatch(fetchStart())
  //     try {
  //       const { data } = await axios(
  //         `${process.env.REACT_APP_BASE_URL}/${path}`,
  //         {
  //           headers: { Authorization: `Token ${token}` },
  //         }
  //       )
  //       //   const stockData = data.data
  //       dispatch(getStockSuccess({ data: data.data, path }))
  //       console.log(data)
  //     } catch (error) {
  //       dispatch(fetchFail())
  //       console.log(error)
  //     }
  //   }

  const getStock = async (path) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosToken.get(path)
      dispatch(getStockSuccess({ data: data.data, path }))
    } catch (error) {
      dispatch(fetchFail())
      console.log(error)
    }
  }

  // return {getFirms, getSales};
  return {getStock}
};

export default useStockRequests;
