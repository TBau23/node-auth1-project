
exports.seed = function(knex) {
 
      // Inserts seed entries
      return knex('users').insert([
        {username: "frodo", password: "pass"},
        {username: "samwise", password: "pass"},
        {username: "aragorn", password: "pass"}
      ]);
    
};
