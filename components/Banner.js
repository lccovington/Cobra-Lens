import * as React from "react";
import { HStack, Banner, Button, Avatar } from "@react-native-material/core";

export default function ClassBanner(props) {

    const classesText = {
        "bell-tower": "Located behind Davidson Hall, the Bell Tower has been a campus landmark since 1914. It houses the original school house bell of Welsh Neck High School, the coeducational academy that preceded Coker College from 1894 to 1908. Generations of Coker students have rung the bell for Coker. In years past, the tolling bell woke college students up for classes and told them when to go to bed. Today, the bell is rung at commencement and other special occasions.",
        "davidson": "Listed on the National Register of Historic Places and situated at the center of campus, Davidson Hall was built in 1910. It was originally home to the College's administration and library. The building is named in honor of longtime faculty member Dr. Elizabeth H. Davidson, and now contains round table classrooms, faculty offices, and the Charles W. Coker Auditorium.",
        "gym": "The new Harris E. and Louise H. DeLoach Center is Coker’s state-of-the-art, 71,000 square-foot athletics complex. The facility features a main gymnasium with a seating capacity of 1,832, as well as a practice gym to accommodate all athletic teams’ games and practices. Other wide-ranging features include classroom and study areas, multiple state-of-the-art training rooms (open to all students, including non-athletes), offices, a conference room, a walking track and a café.",
        "library": "The hub of academic life at Coker, this state-of-the-art facility merges the traditional library with innovative digital technologies and a Student Success Center. Students visiting the LITC can work with a librarian to complete research, check in with their student success coach about their academic progress, receive tutoring in a variety of subjects, or reserve study space for individual or group coursework. The LITC is also home to the James Daniels Boardroom (2nd Floor) and Coker University archives, which contain materials from institutional history over the past century.",
        "student-center": "The Coker Student Center was built in 1973 and is named for the son of Coker&apos;s founder, Major James Lide Coker, and his wife, both longtime college benefactors. David R. Coker was the founder of Coker&apos;s Pedigreed Seed Company. Colorful banners displayed on the face of the building serve as reminders of the six tenets of our Coker Student Covenant: Integrity, Respect, Scholarship, Sustainability, Community, and Knowledge."
    };

  return (
    
    <Banner
    illustration = {
        <Avatar image={{ uri: "https://pbs.twimg.com/profile_images/1159905126863319041/TVp-WKNs_400x400.png" }}/>
      }
    text={classesText[props.class]}
  />
  );
}

