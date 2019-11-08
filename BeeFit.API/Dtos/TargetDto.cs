using BeeFit.API.Models.Enums;
using System;

namespace BeeFit.API.Dtos
{
    public class TargetDto
    {
        public int Id { get; set; }
        public DateTime EstimatedEnd { get; set; }
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
