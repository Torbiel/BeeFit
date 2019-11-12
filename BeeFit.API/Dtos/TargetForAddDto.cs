using BeeFit.API.Models.Enums;

namespace BeeFit.API.Dtos
{
    public class TargetForAddDto
    {
        public float WeightFrom { get; set; }
        public float WeightTo { get; set; }
        public float ChangePerWeek { get; set; }
        public ActivityType DayActivity { get; set; }
        public ActivityType TrainingActivity { get; set; }
    }
}
