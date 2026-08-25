const modal = document.getElementById("project_modal");
const closeModal = document.querySelector(".close-modal");
const buttons = document.querySelectorAll(".view-details");

const projects = {
  project1: {
    title: "Document Submission & Management System for LCDC in DLSU-D",
    status: "(On-Going)",
    description:
      "A centralized web platform for managing program activity submissions and approvals.",
    tech: "React, CSS, Typescript, Firebase",
    collaborators: "Renz Mathieu Raquin & Matthew Ryan Sabino",
  },

  project2: {
    title: "Crystal Clean Cleaning Services",
    description:
      "A web-based platform for managing cleaning services and customer interactions.",
    tech: "HTML, CSS, JavaScript, PHP",
    collaborators: "Bianca Lauryn Magno",
  },

  project3: {
    title: "Faculty-Satisfaction Survey",
    description:
      "A simple satisfaction survey provided to students for evaluating faculty.",
    tech: "HTML, CSS, JavaScript",
    collaborators: "Individual Project",
  },
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];

    document.getElementById("modal_title").textContent = project.title;
    document.getElementById("modal_status").textContent = project.status;
    document.getElementById("modal_description").textContent =
      project.description;
    document.getElementById("modal_tech").textContent = project.tech;
    document.getElementById("modal_collaborators").textContent =
      project.collaborators;


modal.classList.add("is-visible");
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("is-visible");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("is-visible");
  }
});
