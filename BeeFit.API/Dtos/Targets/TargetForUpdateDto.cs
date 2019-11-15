using BeeFit.API.Models.Enums;

namespace BeeFit.API.Dtos.Targets
{
    public class TargetForUpdateDto
    {
        public float WeightFrom { get; set; }
        public float WeightTo { get; set; }
        public float ChangePerWeek { get; set; }
        public ActivityType DayActivity { get; set; }
        public ActivityType TrainingActivity { get; set; }
        public float Callories { get; set; }
        public float Proteins { get; set; }
        public float Fats { get; set; }
        public float Carbohydrates { get; set; }
    }
}
