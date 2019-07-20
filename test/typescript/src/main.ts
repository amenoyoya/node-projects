class Person {
	fullName: string;

	constructor(
		public firstName: string,
		public lastName: string)
	{
			this.fullName = firstName + " " + lastName;
	}
}

const greeter = (person: Person) => 'Hello, ' + person.fullName;
let user = new Person('Robin', 'Brandner');

document.getElementById('root').innerHTML = greeter(user);