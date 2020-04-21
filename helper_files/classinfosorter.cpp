#include <iostream>
#include <stdio.h>
#include <fstream>
#include <string>
#include <vector>

using namespace std;

struct ClassData{
    string classID;
    string classSubject;
    string classCode;
    string otherInfo;
};

struct CourseData{
    string classSubject;
    string classCode;
    string otherInfo;
};

vector <ClassData> classesVect;
vector <CourseData> coursesVect;

bool classMatches(vector <CourseData> vect, string subject, string code){
    for(int i = 0; i < vect.size(); i++){
        if((subject == vect[i].classSubject) && (code == vect[i].classCode)){
            return true;
        }
    }
    return false;
}

void readCourses(string fileName){
    fstream file;
    file.open(fileName);
    if(!file.is_open()){
        cout << "Failed to open file " << fileName << endl;
        return;
    }
    string data = "";
    int delimLoc = 0;
    while(getline(file, data)){
        CourseData courseIter;

        delimLoc = data.find(',');
        courseIter.classSubject = data.substr(0, delimLoc);
        data.erase(0, delimLoc + 1);

        delimLoc = data.find(',');
        courseIter.classCode = data.substr(0, delimLoc);
        data.erase(0, delimLoc + 1);

        courseIter.otherInfo = data;
        coursesVect.push_back(courseIter);

        data = "";
    }
    file.close();
    return;
}

void readClasses(string fileName){
    fstream file;
    file.open(fileName);
    if(!file.is_open()){
        cout << "Failed to open file " << fileName << endl;
        return;
    }
    string data = "";
    int delimLoc = 0;
    while(getline(file,data)){
        ClassData classIter;

        delimLoc = data.find(',');
        classIter.classID = data.substr(0, delimLoc);
        data.erase(0, delimLoc + 1);

        delimLoc = data.find(',');
        classIter.classSubject = data.substr(0, delimLoc);
        data.erase(0, delimLoc + 1);
        
        delimLoc = data.find(',');
        classIter.classCode = data.substr(0, delimLoc);
        data.erase(0, delimLoc + 1);

        classIter.otherInfo = data;
        
        if(classMatches(coursesVect, classIter.classSubject, classIter.classCode)){
            classesVect.push_back(classIter);
        }

        data = "";
    }
    file.close();
    return;
}


void writeData(string fileName){
    fstream file;
    file.open(fileName);
    if(!file.is_open()){
        cout << "Failed to open file " << fileName << endl;
        return;
    }
    string data = "";
    int delimLoc = 0;
    for(int i = 0; i < classesVect.size(); i++){
        data = classesVect[i].otherInfo;

        file << classesVect[i].classID << ",";

        file << classesVect[i].classSubject << ",";

        file << classesVect[i].classCode << ",";

        //10
        delimLoc = data.find(',');
        file << data.substr(0, delimLoc) << ",";
        data.erase(0, delimLoc + 1);

        //10:00:00
        delimLoc = data.find(',');
        file << data.substr(0, delimLoc) << ",";
        data.erase(0, delimLoc + 1);

        //10:50:00
        delimLoc = data.find(',');
        file << data.substr(0, delimLoc) << ",";
        data.erase(0, delimLoc + 1);

        //MW
        delimLoc = data.find(',');
        file << data.substr(0, delimLoc) << ",";
        data.erase(0, delimLoc + 1);

        //HALE 230
        delimLoc = data.find(',');
        file << data.substr(0, delimLoc) << ",";
        data.erase(0, delimLoc + 1);

        //This needs special treatment due to the name splice
        delimLoc = data.find(',');
        file << data.substr(0, delimLoc);
        data.erase(0, delimLoc + 1);
        delimLoc = data.find(',');
        file << "," << data.substr(0, delimLoc) << ",";
        data.erase(0, delimLoc + 1);

        //final
        file << data << '\n';
    }
    file.close();
    return;
}

int main(){
    readCourses("Course_info_nodup.csv");
    readClasses("Class_info_nodup.csv");
    for(int i = 0; i < 20; i++){
        cout << coursesVect[i].classSubject << "," << coursesVect[i].classCode << "," << coursesVect[i].otherInfo << endl;
    }
    cout << "Size: " << coursesVect.size() << endl;
    for(int i = 0; i < 20; i++){
        cout << classesVect[i].classID << " | ";
        cout << classesVect[i].classSubject << " | ";
        cout << classesVect[i].classCode << " | ";
        cout << classesVect[i].otherInfo << endl;
    }
    cout << "Classvect size: " << classesVect.size() << endl;
    writeData("Class_info_nodup_compat.txt");
    return 0;

}