import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";

const Form = ({ onSubmit }) => {
    const [ formData, setFormData ] = useState({
        name: "",
        email: "",
        file: null,
    });

    const [validator] = useState(new SimpleReactValidator());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && handleFileValidation(file)) {
          setFormData({ ...formData, file });
        }
      };
    
      const handleFileValidation = (file) => {
        const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
        const maxSize = 5 * 1024 * 1024; // 5 MB
        if (!allowedTypes.includes(file.type)) {
          alert("Solo se permiten archivos PNG, JPEG o PDF.");
          return false;
        }
        if (file.size > maxSize) {
          alert("El archivo excede el tamaño máximo de 5 MB.");
          return false;
        }
        return true;
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validator.allValid()) {
            onSubmit(formData);
            setFormData({ name: "", email: "" });
            validator.hideMessages();
        } else {
            validator.showMessages();
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Formulario de Registro</h1>
            <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
            
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Nombre:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${
                        validator.message("name", formData.name, "required|alpha_space")
                            ? "is-invalid"
                        : ""
                    }`}
                    value={formData.name}
                    onChange={handleChange}
                />
                <div className="invalid-feedback">
                    {validator.message("name", formData.name, "required|alpha_space")}
                </div>
            </div>
    
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Correo Electrónico:
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${
                    validator.message("email", formData.email, "required|email")
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                />
                <div className="invalid-feedback">
                    {validator.message("email", formData.email, "required|email")}
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="file" className="form-label">
                    Subir Archivo:
                </label>
                <input
                    type="file"
                    id="file"
                    name="file"
                    className="form-control"
                    onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                />
            </div>
    
            <button type="submit" className="btn btn-primary w-100">
                Enviar
            </button>

            </form>
        </div>
    );
};
    
export default Form;