INSERT INTO department (dep_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO role (department_id, title, salary)
VALUES (1, "Lead", 120000),
       (1, "Manager", 95000),
       (1, "Engineer", 70000),
       (1, "Sale Associate", 60000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Naruto", "Uzumaki", 1, null),
       ("Sasuke", "Uchiha", 2, null),
       ("Sakura", "Haruno", 3, null),
       ("Kakashi", "Hatake", 4, null);