namespace BeeFit.API.Helpers
{
    public class IngredientsPagingParams
    {
        private const int maxPageSize = 50;
        public int PageNumber { get; set; }
        
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > maxPageSize) ?  maxPageSize : value; }
        }

    }
}
