
exports.seed = function(knex) {
  //00-cleanup.js is clearing tables
   const users = [
        {id: 1, username: 'chad', password: 'password', department: 'admin' },
      ];

      return knex('users')
        .insert(users)
        .then(() => {
          console.log(`** seed data for users added. **`)
        });
};
