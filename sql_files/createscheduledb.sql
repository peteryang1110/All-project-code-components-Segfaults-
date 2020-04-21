-- PostgreSQL database dump
-- CSCI 3308 Class Scheduler Project

-- 
-- Name: Student_names; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE Student_names(
    student_id INT NOT NULL,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
);

ALTER TABLE Student_names OWNER TO postgres;

-- 
-- Name: Student_majors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE Student_majors(
    student_id INT NOT NULL,
    major_id INT NOT NULL,
);

ALTER TABLE Student_majors OWNER TO postgres;

-- 
-- Name: Major_names; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE Major_names(
    major_id INT NOT NULL,
    major_name VARCHAR(45) NOT NULL,
);

ALTER TABLE Major_names OWNER TO postgres;

-- 
-- Name: Completed_courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE Completed_courses(
    student_id INT NOT NULL,
    course_department VARCHAR(4) NOT NULL,
    course_subject INT NOT NULL,
);

ALTER TABLE Completed_courses OWNER TO postgres;

-- 
-- Name: Course_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE Course_info(
    course_department VARCHAR(4) NOT NULL,
    course_subject INT NOT NULL,
    course_description TEXT,
    course_credits INT,
    course_name VARCHAR(45),
);

ALTER TABLE Course_info OWNER TO postgres;

-- 
-- Name: Class_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE Class_info(
    class_number INT NOT NULL;
    course_department VARCHAR(4) NOT NULL,
    course_subject INT NOT NULL,
    course_section INT,
    course_start TIME,
    course_end TIME,
    course_days VARCHAR(5),
    course_location VARCHAR(10),
    course_instructor VARCHAR(45),
    course_campus VARCHAR(10),
);

ALTER TABLE Class_info OWNER TO postgres;

--
-- Name: Student_names_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY Student_names
    ADD CONSTRAINT Student_names_pkey 
    PRIMARY KEY (student_id);

--
-- Name: Major_names_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY Major_names
    ADD CONSTRAINT Major_names_pkey 
    PRIMARY KEY (major_id);

--
-- Name: Class_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY Class_info
    ADD CONSTRAINT Class_info_pkey 
    PRIMARY KEY (class_number);
--
-- Name: Course_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY Course_info
    ADD CONSTRAINT Course_info_pkey 
    PRIMARY KEY (course_department, course_subject);

--
-- Name: Student_majors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY Student_majors
    ADD CONSTRAINT Student_majors_pkey 
    PRIMARY KEY (student_id, major_id);

--
-- Name: Completed_courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY Completed_courses
    ADD CONSTRAINT Completed_courses_pkey 
    PRIMARY KEY (student_id, course_department, course_subject);

--
-- Name: Student_majors_sid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- Name: Student_majors_mid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY Student_majors
    ADD CONSTRAINT Student_majors_sid_fkey 
    FOREIGN KEY (student_id) REFERENCES Student_names(student_id) 
    ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY Student_majors
    ADD CONSTRAINT Student_majors_mid_fkey 
    FOREIGN KEY (major_id) REFERENCES Major_names(major_id) 
    ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: Class_info_cd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- Name: Class_info_cs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY Class_info
    ADD CONSTRAINT Class_info_cd_fkey 
    FOREIGN KEY (course_department) REFERENCES Course_info(course_department) 
    ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY Class_info
    ADD CONSTRAINT Class_info_cs_fkey 
    FOREIGN KEY (course_subject) REFERENCES Course_info(course_subject) 
    ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- Name: Completed_courses_sid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- Name: Completed_courses_cd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- Name: Completed_courses_cs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY Completed_courses
    ADD CONSTRAINT Completed_courses_sid_fkey 
    FOREIGN KEY (student_id) REFERENCES Student_names(student_id) 
    ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY Completed_courses
    ADD CONSTRAINT Completed_courses_cd_fkey 
    FOREIGN KEY (course_department) REFERENCES Course_info(course_department) 
    ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY Completed_courses
    ADD CONSTRAINT Completed_courses_cs_fkey 
    FOREIGN KEY (course_subject) REFERENCES Course_info(course_subject) 
    ON UPDATE CASCADE ON DELETE RESTRICT;