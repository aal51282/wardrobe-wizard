"use client";
// Import necessary components and hooks
import Image from "next/image";
import { useRouter } from "next/navigation"; // Next.js router for navigation
import styles from "./ProjectTeam.module.css";

export default function ProjectTeamPage() {
  const router = useRouter();

  // Team member data
  const teamMembers = [
    { name: "Grace Walbrecher", role: "Frontend Developer", image: "/grace.png" },
    { name: "Angel Loaiza", role: "Frontend Developer", image: "/angel.png" },
    { name: "Brenda Thornton", role: "Backend Developer", image: "/brenda.png" },
    { name: "Lily Valdes", role: "Database Manager", image: "/lily.png" },
  ];

  return (
    <div className={styles.teamContainer}>
      {/* Header section with title and illustration */}
      <h2 className={styles.title}>Our Team</h2>
      <div className={styles.illustrationContainer}>
        <Image
          src="/wardrobe.png"
          alt="Team Illustration"
          width={400}
          height={200}
        />
      </div>

      {/* Default AI Generated Description, I didnt know what to put here -G*/}
      <p className={styles.description}>
        We are a group of college students working together on this project as
        part of our assignment. Our goal is to build a useful and functional
        wardrobe organizer. Thank you for visiting our project!
      </p>

      {/* Team member profiles */}
      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.teamMember}>
            <Image
              src={member.image}
              alt={member.name}
              width={100}
              height={100}
              className={styles.profileImage}
            />
            <h3 className={styles.memberName}>{member.name}</h3>
            <p className={styles.memberRole}>{member.role}</p>
          </div>
        ))}
      </div>

      {/* Back button */}
      <button
        className={styles.backButton}
        onClick={() => router.push("/user-view")}
      >
        <span>⬅️</span> Back
      </button>
    </div>
  );
}
