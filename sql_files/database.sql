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
    class_number INT NOT NULL,
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

