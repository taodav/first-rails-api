# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Student.delete_all
Cohort.delete_all

cohorts = ["Fiery Skippers", "Rock Doves", "Pocket Gophers"]
cohorts.each do |cohort|
  c = Cohort.create(name: cohort)
  rand(5..10).times do
    c.students.create(name: "Student #" + rand(1..2000).to_s)
  end
end
