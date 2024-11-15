const pool = require("../../db");

module.exports = {
  getApplicationData: async (applicationId) => {
    try {
      const id = applicationId;
      console.log("id", id);
      const query = `
                SELECT * FROM applicant_data
                WHERE application_no = $1
            `;
      const values = [id];
      return await pool.query(query, values);
    } catch (error) {
      console.error("Error fetching application data:", error.message);
    }
  },
};

