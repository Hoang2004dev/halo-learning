import StudyDayList from "../features/studyDay/StudyDayList";
import AnimatedPattern from "../components/common/AnimatedPattern";

const StudyDayPage = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <AnimatedPattern />
      <StudyDayList />
    </div>
  );
};

export default StudyDayPage;
