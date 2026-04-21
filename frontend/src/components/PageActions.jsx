import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PageActions() {
  const navigate = useNavigate();

  return (
    <div className="page-actions">
      <button className="btn-outline-soft page-action-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>
      <button className="btn-outline-soft page-action-btn" onClick={() => navigate("/dashboard")}>
        <FaHome /> Home
      </button>
    </div>
  );
}

export default PageActions;