import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addSortie } from "../../../services/addSortieServices";
import "./Sorties-add-form.css";
import { useState } from "react";

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
    .test("fileSize", "Images are required", (value) => value?.length > 0),
});

const AddSortieForm = () => {
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
      images: null,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "images") {
          Array.from(data.images).forEach((file) =>
            formData.append("images", file)
          );
        } else {
          formData.append(key, data[key]);
        }
      });
      const response = await addSortie(formData);
      console.log("Sortie created:", response.data);
      setLoading(false);
      reset();
    } catch (error) {
      console.error("Failed to create sortie:", error);
      setLoading(false);
    }
  };

  return (
    <div className="add-tb-container">
      <h1>Créer Une Sortie Team-Building</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-tb">
        <div className="form-row">
          <div>
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
          </div>
          <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div className="form-row">
          <div>
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
          </div>
          <div>
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
        </div>
        <div>
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <TextField
                type="file"
                inputProps={{ multiple: true }}
                fullWidth
                variant="outlined"
                error={!!errors.images}
                helperText={errors.images?.message || ""}
                onChange={(e) => field.onChange(e.target.files)}
              />
            )}
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Loading..." : "Créer une sortie"}
        </button>
      </form>
    </div>
  );
};

export default AddSortieForm;
