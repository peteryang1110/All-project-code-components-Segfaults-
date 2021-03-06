-- #SEARCH FOR CLASS
-- #These variable assignments are technically the realm of node, but I put them here
-- #For consistency 
-- NOTE! IF A VALUE IS NULL, change it to %
var course_code_input;
var course_subject_input;

SELECT Class_info.Course_department, Class_info.Course_subject, 
    Class_info.Course_start, Class_info.Course_end, Class_info.Course_instructor, 
    Class_info.Course_days, Course_info.Course_name
    FROM Class_info
    FULL OUTER JOIN Course_info 
    ON Class_info.Course_department = Course_info.Course_department
    AND Class_info.Course_subject = Course_info.Course_subject
    WHERE
        Class_info.Course_department LIKE '%' || course_code_input || '%'
        AND(CAST(Class_info.Course_subject AS VARCHAR(5)) LIKE '%' || course_subject_input || '%');
-- Example query
SELECT Class_info.Course_department, Class_info.Course_subject, 
    Class_info.Course_start, Class_info.Course_end, Class_info.Course_instructor, 
    Class_info.Course_days, Course_info.Course_name
    FROM Class_info
    FULL OUTER JOIN Course_info 
    ON Class_info.Course_department = Course_info.Course_department
    AND Class_info.Course_subject = Course_info.Course_subject
    WHERE
        Class_info.Course_department LIKE '%' || 'CSCI' || '%'
        AND(CAST(Class_info.Course_subject AS VARCHAR(5)) LIKE '%' || 1300 || '%');

-- Final Result
var course_code_input = input();
var course_subject_input = input();

var search_result = "SELECT Class_info.Course_department, Class_info.Course_subject, 
    Class_info.Course_start, Class_info.Course_end, Class_info.Course_instructor, 
    Class_info.Course_days, Course_info.Course_name
    FROM Class_info
    FULL OUTER JOIN Course_info 
    ON Class_info.Course_department = Course_info.Course_department
    AND Class_info.Course_subject = Course_info.Course_subject
    WHERE
        Class_info.Course_department LIKE '%' ||'" +  UPPER(course_code_input) + "'|| '%'
        AND(CAST(Class_info.Course_subject AS VARCHAR(5)) LIKE '%' ||'" + UPPER(course_subject_input) + "'|| '%');"