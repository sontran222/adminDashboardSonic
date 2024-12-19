import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import { Box, Button } from "@mui/material";
import TextArea from "antd/es/input/TextArea";

//utils
import UploadImage from "ultis/UploadImage";
import AutoCompleteCountries from "ultis/AutoComplete";

import "ultis/TabControl/style/Table.scss";

//antd
import { Table } from "antd";
import AddIcon from "@mui/icons-material/Add";
import CustomAddEpisodeModal from "ultis/CustomAddEpisodeModal";
import { DatePicker, Input, Select, Tabs } from "antd";
import axios from "axios";

import dayjs from "dayjs";

const FilmInfo = ({ slug }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [IdTemp, setIdTemp] = useState({
    idFilm: "",
    idDes: "",
    idCoun: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    originName: "",
    year: 1999,
    chieurap: false,
    content: "",
    genreSlug: "",
    countryName: null,
    tempThumb: "",
    tempPoster: "",
  });

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onChangeYearPicker = (year) => {
    setFormData({
      ...formData,
      year: year.$y,
    });
  };

  // Xử lý chọn phim chiếu rạp
  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      chieurap: value === "true", //1 kiểu so sánh để trả ra 1 hoặc 0 vì value: "true" là chuỗi "true"
    });
  };

  const handleSelectGenre = (value) => {
    setFormData({
      ...formData,
      genreSlug: value,
    });
  };

  const handleChangeCountry = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Nút cập nhật
  const handleUpdate = async () => {
    const updateDataFilm = {
      originName: formData.originName,
      year: formData.year,
      chieurap: formData.chieurap,
      genreSlug: formData.genreSlug,
    };

    const updateDataDes = {
      content: formData.content,
    };
    const updateDataCoun = {
      countryName: formData.countryName,
    };

    try {
      //film
      const responseFilm = await axios.put(
        `http://localhost:8080/api/films/update/${IdTemp.idFilm}`,
        updateDataFilm,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseDes = await axios.put(
        `http://localhost:8080/api/descriptions/update/${IdTemp.idDes}`,
        updateDataDes,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseCoun = await axios.put(
        `http://localhost:8080/api/countries/update/${IdTemp.idCoun}`,
        updateDataCoun,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(responseFilm);
      console.log(responseDes);
      console.log(responseCoun);
    } catch (error) {
      console.log("Có lỗi xảy ra: ", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        const responseFilm = await axios.get(`http://localhost:8080/api/films/slug/${slug}`);
        const responseDes = await axios.get(`http://localhost:8080/api/descriptions/${slug}`);
        const responseCoun = await axios.get(`http://localhost:8080/api/countries/slug/${slug}`);
        setFormData({
          name: responseFilm.data.result.name || "",
          originName: responseFilm.data.result.originName || "",
          year: responseFilm.data.result.year || 1999,
          chieurap: responseFilm.data.result.chieurap || false,
          Thumb:
            "https://drive.google.com/file/d/" + responseFilm.data.result.thumbURL + "/preview" ||
            "",
          Poster:
            "https://drive.google.com/file/d/" + responseFilm.data.result.posterURL + "/preview" ||
            "",
          genreSlug: responseFilm.data.result.genreSlug || "phim-le",
          countryName: responseCoun.data.result.countryName || null,
          content: responseDes.data.result.content,
        });
        setIdTemp({
          idFilm: responseFilm.data.result.id,
          idDes: responseDes.data.result.id,
          idCoun: responseCoun.data.result.id,
        });
      } catch (error) {
        console.error("Error fetching film data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilmData();
  }, [slug]);
  return isLoading ? (
    <p>...Loading</p>
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <Box>
          <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>Tên phim:</span>
          <Input placeholder="Ví dụ: Đặc vụ 007" name="name" value={formData.name} disabled />
        </Box>
        <Box>
          <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>Tên ban đầu:</span>
          <Input
            placeholder="Ví dụ: Spyder 007"
            name="originName"
            value={formData.originName}
            onChange={handleChangeFormData}
          />
        </Box>

        <Box>
          <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>Mô tả phim:</span>
          <TextArea
            rows={4}
            name="content"
            placeholder="Mô tả ngắn về phim"
            value={formData.content}
            onChange={handleChangeFormData}
          />
        </Box>
      </Grid>

      <Grid item xs={5}>
        <Box>
          <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>
            Năm phát hành:
          </span>
          <DatePicker
            defaultValue={dayjs(`${formData.year}`, "YYYY")}
            onChange={onChangeYearPicker}
            picker="year"
            style={{ width: "100%" }}
          />
        </Box>

        <Box>
          <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>
            Phim chiếu rạp:
          </span>
          <Select
            value={formData.chieurap ? "true" : "false"}
            style={{ width: "100%" }}
            onChange={handleSelectChange}
          >
            <Select.Option value="true">Có</Select.Option>
            <Select.Option value="false">Không</Select.Option>
          </Select>
        </Box>

        <Box>
          <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>Thể loại</span>
          <Select
            defaultValue={formData.genreSlug || "phim-le"}
            onChange={handleSelectGenre}
            style={{ width: "100%" }}
            options={[
              {
                value: "phim-le",
                label: "Phim lẻ",
              },
              {
                value: "phim-bo",
                label: "Phim bộ",
              },
              {
                value: "hoat-hinh",
                label: "Hoạt hình",
              },
              {
                value: "tv-show",
                label: "TV show",
              },
            ]}
          />
        </Box>

        <Box>
          <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>Quốc gia</span>
          <AutoCompleteCountries
            name="countryName"
            countryName={formData.countryName}
            OnChangeCountry={handleChangeCountry}
          />
        </Box>
      </Grid>
      <Button
        variant="contained"
        color="info"
        sx={{
          background: "rgb(26, 115, 232)",
          color: "#FFFFFF",
          marginTop: 2,
          marginBottom: 2,
          marginLeft: 2,
          "&:hover": {
            color: "rgb(26, 115, 232)",
          },
        }}
        onClick={handleUpdate}
      >
        Cập nhật
      </Button>
    </Grid>
  );
};
FilmInfo.propTypes = {
  slug: PropTypes.string.isRequired,
};

const ListUpdateEpisodeTable = ({ slug }) => {
  const [AddEpisodeOpen, setAddEpisodeOpen] = useState(false);
  const [folderIdParent, setFolderIdParent] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddEpisode = () => {
    setAddEpisodeOpen(true);
  };
  useEffect(() => {
    getFolderIdFromFilm();
    getListEpisode();
  }, [slug]);

  const handleCloseEpisode = () => {
    setAddEpisodeOpen(false);
  };

  const getFolderIdFromFilm = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/films/slug/${slug}`);
      setFolderIdParent(response.data.result.folderId);
      console.log(folderIdParent);
      setIsLoading(false);
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };

  const getListEpisode = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/episodes/listSlug/${slug}`);
      const filterData = response.data.result.map((item, index) => {
        return {
          index: index + 1,
          name: item.episodeFilm,
          link: `https://drive.google.com/file/d/${item.videoId}/preview`,
          id: item.id,
          time: "",
        };
      });
      setData(filterData);
      console.log(response.data.result);
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      rowScope: "row",
    },
    {
      title: "Tên tập phim",
      dataIndex: "name",
    },
    {
      title: "Link",
      dataIndex: "link",
    },
    {
      title: "Thời lượng",
      dataIndex: "time",
    },
    {
      title: "Chức năng",
      colSpan: 2,
      dataIndex: "method",
      align: "center",
      render: (_, record) => (
        <Button
          variant="contained"
          color="info"
          sx={{
            background: "#FF9900",
            color: "#FFFFFF",
            "&:hover": {
              color: "#FF9900",
            },
          }}
          onClick={() => console.log("Edit", record)}
        >
          Sửa
        </Button>
      ),
    },
    {
      title: "Chức năng",
      colSpan: 0, //Bỏ tiêu, đề ghép 2 cột thành 1
      dataIndex: "method",
      align: "center",
      render: (_, record) => (
        <Button
          variant="contained"
          color="error"
          sx={{
            background: "#FF0000",
            color: "#FFFFFF",
            "&:hover": {
              color: "#FF0000",
            },
          }}
          onClick={() => console.log("Delete", record)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return isLoading ? (
    <p>...Loading</p>
  ) : (
    <>
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        sx={{
          background: "green",
          color: "#FFFFFF",
          "&:hover": {
            color: "green",
          },
          margin: "1rem 0",
        }}
        onClick={() => handleAddEpisode()}
      >
        Thêm tập mới
      </Button>
      <Table columns={columns} dataSource={data} bordered pagination={{ pageSize: 5 }} />

      <CustomAddEpisodeModal
        isOpen={AddEpisodeOpen}
        onClose={handleCloseEpisode}
        slug={slug}
        folderIdParent={folderIdParent}
      ></CustomAddEpisodeModal>
    </>
  );
};
ListUpdateEpisodeTable.propTypes = {
  slug: PropTypes.string.isRequired,
};

const EditImage = ({ slug }) => {
  return (
    <>
      <>Chỉnh sửa ảnh</>
    </>
  );
};
EditImage.propTypes = {
  slug: PropTypes.string.isRequired,
};
const CommentTable = ({ slug }) => {
  return (
    <>
      <>Bình luận</>
    </>
  );
};
CommentTable.propTypes = {
  slug: PropTypes.string.isRequired,
};
const TabControl = ({ slug }) => {
  const [activeKey, setActiveKey] = useState("1");
  const [items] = useState([
    {
      label: "Thông tin phim",
      key: "1",
      children: <FilmInfo slug={slug} />,
    },
    {
      label: "Chỉnh sửa ảnh",
      key: "2",
      children: <EditImage slug={slug} />,
    },
    {
      label: "Danh sách tập phim",
      key: "3",
      children: <ListUpdateEpisodeTable slug={slug} />,
    },
    {
      label: "Bình luận",
      key: "4",
      children: <CommentTable slug={slug} />,
    },
  ]);

  return (
    <div>
      <Tabs
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        type="card"
        items={items}
        style={{
          marginBottom: 32,
        }}
      />
    </div>
  );
};

TabControl.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default TabControl;
