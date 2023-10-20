import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addMovie } from "../../../apis/movieAPI";
import dayjs from "dayjs";
import { Box, FormControl, FormControlLabel, FormGroup, FormLabel, Modal, Radio, RadioGroup, TextField } from "@mui/material";
import { mixed, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const addMovieSchema = object({
  tenPhim: string().required("Tên Phim không được để trống"),
  biDanh: string()
    .required("Bí danh không được để trống"),
  moTa: string().required("Mô tả không được để trống"),
  hinhAnh: mixed().required("Hình ảnh không được để trống"),
  trailer: mixed().required("trailer không được để trống"),
  ngayKhoiChieu: mixed().required("Ngày khởi chiếu không được để trống"),
});


export default function AddMovie({ handleClose }) {
  const [isHot, setIsHot] = useState(false);
  const [isNowShowing, setIsNowShowing] = useState(false);
  const [isComingSoon, setIsComingSoon] = useState(false);
  // const [rating, setRating] = useState(2);
  const [imgPreview, setImgPreview] = useState("");

  const { register, reset, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      hinhAnh: "",
      trailer: "",
      ngayKhoiChieu: "",

    },
    resolver: yupResolver(addMovieSchema)
  });

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      formData.append("hinhAnh", values.hinhAnh[0]);
      formData.append("trailer", values.trailer);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("maNhom", "GP13");
      formData.append("sapChieu", isComingSoon);
      formData.append("dangChieu", isNowShowing);
      formData.append("hot", isHot);
      formData.append("danhGia", 10);


      return addMovie(formData);
    },

    onSuccess: () => {
      //Đóng modal hoặc chuyển trang
      // Sử dụng queryClient.invalidationQueries để gọi lại API get danh sách phim
      handleClose()
      setImgPreview("")
      reset()
    },
    onError: () => {

    },

  });



  const hinhAnh = watch("hinhAnh");



  useEffect(() => {
    //Chạy vào useEffect callback khi giá trị của hình Ảnh bị thay đổi
    const file = hinhAnh?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      setImgPreview(event.target.result);
    }
  }, [hinhAnh]);


  const rootRef = useRef(null);



  return (


    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          sx={{ marginBottom: "15px" }}
          
          id="tenPhim"
          label="Tên Phim"
          variant="outlined"
          error={!!errors.tenPhim}
          helperText={errors.tenPhim?.message}
          {...register("tenPhim")}
        />
        {/* <input placeholder="Tên Phim" {...register("tenPhim")} /> */}
      </div>
      <div>
        <TextField
          sx={{ marginBottom: "15px" }}
          
          id="biDanh"
          label="Bí Danh"
          variant="outlined"
          error={!!errors.biDanh}
          helperText={errors.biDanh?.message}
          {...register("biDanh")}
        />
        {/* <input placeholder="Bí danh" {...register("biDanh")} /> */}
      </div>
      <div>
        <TextField
          sx={{ marginBottom: "15px" }}
          
          id="moTa"
          label="Mô tả"
          variant="outlined"
          error={!!errors.moTa}
          helperText={errors.moTa?.message}
          {...register("moTa")}
        />
        {/* <input placeholder="Mô tả" {...register("moTa")} /> */}
      </div>
      <div>
        <input
          style={{ marginBottom: "15px" }}
          
          id="hinhAnh"
          label="Hình Ảnh"
          type="file"
          variant="outlined"
          {...register("hinhAnh")}
        />
        {/* event.target.files */}
        {/* <input type="file" placeholder="Hình Ảnh" {...register("hinhAnh")} /> */}
        {imgPreview && <img src={imgPreview} alt="preview" width={200} height={100} />}
      </div>
      <div>
        <TextField
          sx={{ marginBottom: "15px" }}
          
          id="trailer"
          label="Trailer"
          variant="outlined"
          error={!!errors.trailer}
          helperText={errors.trailer?.message}
          {...register("trailer")}
        />
        {/* <input placeholder="Trailer" {...register("trailer")} /> */}
      </div>
      <div>
        {/* <TextField
          sx={{ marginBottom: "15px" }}
          
          id="ngayKhoiChieu"
          label="Ngày Khởi Chiếu Phim"
          type="date"
          variant="outlined"
          error={!!errors.ngayKhoiChieu}
          helperText={errors.ngayKhoiChieu?.message}
          {...register("ngayKhoiChieu", {
            setValueAs: (value) => {
              return dayjs(value).format("DD/MM/YYYY");
            },
          })}
        /> */}
        <input
          type="date"
          placeholder="Ngày khởi chiếu"
          {...register("ngayKhoiChieu", {
            setValueAs: (value) => {
              return dayjs(value).format("DD/MM/YYYY");
            },
          })}
        />
      </div>
      <div>
        <FormControl >
          <FormLabel id="demo-row-radio-buttons-group-label">Sắp Chiếu</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group" {...register("sapChieu")}
            onChange={(event) => {
              setIsComingSoon(event.target.value === "true"); // Chuyển chuỗi "true" thành true, "false" thành false
            }}
          >

            <FormControlLabel value={true.toString()} control={<Radio />} label="True" />
            <FormControlLabel value={false.toString()} control={<Radio />} label="False" />

          </RadioGroup>

        </FormControl>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Đang Chiếu</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"  {...register("dangChieu")}
            onChange={(event) => {
              console.log("event", event.target.value)
              setIsNowShowing(event.target.value === "true"); // Chuyển chuỗi "true" thành true, "false" thành false
              console.log("dangchieu", isNowShowing)
            }}
          >

            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />

          </RadioGroup>

        </FormControl>
        <FormControl >
          <FormLabel id="demo-row-radio-buttons-group-label">Hot</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group" {...register("hot")}
            onChange={(event) => {
              console.log("hot", isHot)
              console.log("event", event.target.value)
              setIsHot(event.target.value === "true"); // Chuyển chuỗi "true" thành true, "false" thành false
              console.log("hot", isHot)

            }}
          >

            <FormControlLabel value={true.toString()} control={<Radio />} label="True" />
            <FormControlLabel value={false.toString()} control={<Radio />} label="False" />

          </RadioGroup>

        </FormControl>
      </div>

      <button>Thêm Phim</button>
    </form>


  );
}
