namespace BeeFit.API.Helpers
{
    // For Dishes and Ingredients together
    public class FoodSearchParams
    {
        private const int maxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > maxPageSize) ?  maxPageSize : value; }
        }

        public string Name { get; set; }
        public int? UserId { get; set; }
        public float? MinCallories { get; set; }
        public float? MaxCallories { get; set; }
        public float? MinProteins { get; set; }
        public float? MaxProteins { get; set; }
        public float? MinFats { get; set; }
        public float? MaxFats { get; set; }
        public float? MinCarbohydrates { get; set; }
        public float? MaxCarbohydrates{ get; set; }
        public FoodOrderBy? OrderBy { get; set; }
        public bool Ascending { get; set; }
    }
}
