import { useState } from "react";
import "../css/EmissionFactors.css";

const EmissionFactorForm = ({ onSave, onClose, factor }) => {

    const [formData, setFormData] = useState({
        activityType: factor?.activityType || "",
        category: factor?.category || "",
        factor: factor?.factor || ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay">

            <div className="modal">

                <h2>
                    {factor ? "Edit Emission Factor" : "Add Emission Factor"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Activity Type</label>

                        <input
                            type="text"
                            name="activityType"
                            value={formData.activityType}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Category</label>

                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Emission Factor</label>

                        <input
                            type="number"
                            step="0.01"
                            name="factor"
                            value={formData.factor}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="modal-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Save
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default EmissionFactorForm;