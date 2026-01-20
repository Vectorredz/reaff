export default function PublicRelations() {
  return (
    <div>
      <h2>Public Relations Committee Concerns</h2>
      <div>
        <h3>
          Would you be willing to participate in liking/sharing for partnership
          responsibilities? Check all that apply.
        </h3>
        <div>
          <input type="checkbox" name="partnership" id="computing" />
          <label htmlFor="computing">
            Yes, for computing related events only
          </label>
          <input type="checkbox" name="partnership" id="engineering" />
          <label htmlFor="engineering">
            Yes, for events hosted by engineering organizations only
          </label>
          <input type="checkbox" name="partnership" id="no" />
          <label htmlFor="no">Not at all</label>
        </div>
      </div>
      <div>
        <h3>How many posts a month would you be willing to like/share for partnerships (excluding UP ACM events)?</h3>
        <input type="radio" name="posts" id="0" />
        <label htmlFor="0">0 posts</label>
        <input type="radio" name="posts" id="1" />
        <label htmlFor="1">1-2 posts</label>
        <input type="radio" name="posts" id="2" />
        <label htmlFor="2">3-5 posts</label>
        <input type="radio" name="posts" id="3" />
        <label htmlFor="3">More than 5 posts</label>
      </div>
    </div>
  );
}
