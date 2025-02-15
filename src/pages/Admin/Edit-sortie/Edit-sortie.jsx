import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  getSortieById,
  updateSortie,
} from "../../../services/addSortieServices";
import "./Edit-sortie.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

// Validation schema
const sortieSchema = yup.object().shape({
  titleFr: yup.string().required("French title is required"),
  titleEn: yup.string().required("English title is required"),
  descFr: yup.string().required("French description is required"),
  descEn: yup.string().required("English description is required"),
  days: yup.string(),
  localisation: yup.string().required("Localisation is required"),
  images: yup
    .mixed()
    .test("fileSize", "Each file must be smaller than 5MB", (files) => {
      if (!files || files.length === 0) return true;
      return files.every((file) => file.size <= 5 * 1024 * 1024); // 5MB
    }),
});

const EditSortie = () => {
  const navigate = useNavigate();
  const { Sortieid } = useParams();
  const [sortie, setSortie] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sortieSchema),
    defaultValues: {
      titleFr: "",
      titleEn: "",
      descFr: "",
      descEn: "",
      days: "",
      localisation: "",
      images: [],
    },
  });

  useEffect(() => {
    getSortieById(Sortieid)
      .then((response) => {
        const data = response.data;
        setSortie(data);
        setImages(data?.images || []);
        reset({
          titleFr: data.titleFr || "",
          titleEn: data.titleEn || "",
          descFr: data.descFr || "",
          descEn: data.descEn || "",
          days: data.days || "",
          localisation: data.localisation || "",
          images: [],
        });
      })
      .catch((error) => {
        console.error("Error fetching sorties:", error);
      });
  }, [Sortieid, reset]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...newFiles]); // Combine old and new files
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    const form = new FormData();
    images.forEach((image) => {
      // Check if the image is a File object or an existing URL
      if (image instanceof File) {
        form.append("images", image);
      } else {
        form.append("existingImages", image); // Pass existing image URLs to the backend
      }
    });

    form.append("titleEn", data.titleEn);
    form.append("titleFr", data.titleFr);
    form.append("descEn", data.descEn);
    form.append("descFr", data.descFr);
    form.append("days", data.days);
    form.append("localisation", data.localisation);

    setLoading(true);

    updateSortie(Sortieid, form)
      .then((res) => {
        console.log("Update successful:", res.data.message);
        navigate("/admin/tb-sorties");
      })
      .catch((err) => {
        console.error("Error updating sortie:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="add-tb-container">
      <h1>Modifier une sortie</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-tb">
        <div className="form-row">
          <Controller
            name="titleFr"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title (French)"
                variant="outlined"
                fullWidth
                error={!!errors.titleFr}
                helperText={errors.titleFr?.message}
              />
            )}
          />
          <Controller
            name="titleEn"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title (English)"
                variant="outlined"
                fullWidth
                error={!!errors.titleEn}
                helperText={errors.titleEn?.message}
              />
            )}
          />
        </div>
        <Controller
          name="descFr"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description (French)"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              error={!!errors.descFr}
              helperText={errors.descFr?.message}
            />
          )}
        />
        <Controller
          name="descEn"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description (English)"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              error={!!errors.descEn}
              helperText={errors.descEn?.message}
            />
          )}
        />
        <div className="form-row">
          <Controller
            name="days"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Days"
                variant="outlined"
                fullWidth
                error={!!errors.days}
                helperText={errors.days?.message}
              />
            )}
          />
          <Controller
            name="localisation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Localisation"
                variant="outlined"
                fullWidth
                error={!!errors.localisation}
                helperText={errors.localisation?.message}
              />
            )}
          />
        </div>
        <div>
          <label>Upload Images:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="image-preview">
            {images.map((image, index) => (
              <div key={index} className="image-item">
                {image instanceof File ? (
                  <p>{image.name}</p>
                ) : (
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    style={{ width: "200px", height: "200px" }}
                  />
                )}
                <button type="button" onClick={() => removeImage(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          {errors.images && (
            <p className="error-message">{errors.images.message}</p>
          )}
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Loading..." : "Modifier la sortie"}
        </button>
      </form>
    </div>
  );
};

export default EditSortie;
