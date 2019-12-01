namespace BeeFit.API.Helpers
{
    // For Dishes and Ingredients together
    public class PagingParams
    {
        private const int maxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > maxPageSize) ?  maxPageSize : value; }
        }

        public int? UserId { get; set; }
        public float? MinCallories { get; set; }
        public float? MaxCallories { get; set; }
    }
}
