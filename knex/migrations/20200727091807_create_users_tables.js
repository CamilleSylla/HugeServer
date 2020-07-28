
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
      table.increments('id').primary;
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
  }).createTable('login', function(table){
    table.increments('user_id').primary;
    table.char('hash').notNullable();
    table.string('email').notNullable();
    table.integer('id').references('user_id').intable('users');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users').dropTable('login');
};
