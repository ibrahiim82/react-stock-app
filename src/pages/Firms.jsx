import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStockRequests from "../services/useStockRequests";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FirmCard from "../components/FirmCard";
import FirmModal from "../components/FirmModal";
import { CardSkeleton, NoDataMessage } from "../components/Messages";

// export const getFirms = async () => {
//   try {
//     const { data } = await axios.post(
//       `${process.env.REACT_APP_BASE_URL}/firms/`,{
//         headers: { "Authorization":  `Token ${token}`},
//       });
//     console.log(data)
//   } catch (error) {
//     console.log(error);
//   }
// };

const Firms = () => {
  // const {token} = useSelector((state)=>state.auth)
  // const { getFirms, getSales } = useStockRequests()

  const { getStock } = useStockRequests();
  const { firms, loading } = useSelector((state) => state.stock);

  const initialState = { image: "", address: "", phone: "", name: "" };
  const [data, setData] = useState(initialState);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setData(initialState);
  };

  // sayfa yüklendikten sonra firmaları getir
  useEffect(() => {
    // getFirms()
    // getSales()
    getStock("firms");
  }, []);

  return (
    <div>
      <Typography variant="h2" color={"error"} mb={2}>
        Firms
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleOpen}>
        NEW FIRM
      </Button>

      <FirmModal
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
      />

      {loading && (
        <CardSkeleton>
          <FirmCard />
        </CardSkeleton>
      )}

      {!loading && !firms.length && <NoDataMessage />}
      {!loading && firms.length > 0 && (
        <Grid container justifyContent={"center"} gap={2}>
          {firms?.map((firm, index) => (
            <Grid item key={index}>
              <FirmCard
                firm={firm}
                handleOpen={handleOpen}
                data={data}
                setData={setData}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Firms;
