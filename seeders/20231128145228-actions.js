"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Actions", [
			{
				online: 0,
				in_person: 1,
				start_time: "2024-01-01T12:00:00",
				end_time: "2024-01-01T17:00:00",
				is_group: 1,
				name: "BBQ",
				description: "BBQ in the park",
				organiserId: 2,
				online_link: null,
				latitude: 41.38090587280174,
				longitude: 2.1230949898268064,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				online: 1,
				in_person: 1,
				start_time: "2024-01-05T20:00:00",
				end_time: "2024-01-05T23:30:00",
				is_group: 1,
				name: "Movie Night",
				description: "Gather to watch Scary Movie V",
				organiserId: 2,
				online_link: " https://zoom.us/j/5551112222",
				latitude: 41.38090587280189,
				longitude: 2.1230949898268055,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				online: 1,
				in_person: 0,
				start_time: null,
				end_time: null,
				is_group: 0,
				name: "Article Reading",
				description: "Read this interesting article in your own time",
				organiserId: 1,
				online_link:
					"https://www.theguardian.com/film/2014/aug/31/pride-film-gay-activists-miners-strike-interview",
				latitude: null,
				longitude: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				online: 0,
				in_person: 1,
				start_time: null,
				end_time: null,
				is_group: 0,
				name: "Buy a book!",
				description:
					"Next time you want to get a book, research and support a local LGBTQ+ friendly bookstore in your area",
				organiserId: 1,
				online_link: null,
				latitude: null,
				longitude: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				online: 0,
				in_person: 1,
				start_time: "2024-01-06T18:00:00",
				end_time: "2024-01-06T20:30:00",
				is_group: 1,
				name: "LQBTQ+ in tech",
				description: "Come and enjoy an evening of networking and discussion",
				organiserId: 2,
				online_link: null,
				latitude: 41.38090587280239,
				longitude: 2.1230949898268895,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				online: 0,
				in_person: 1,
				start_time: "2024-01-07T13:00:00",
				end_time: "2024-01-07T16:00:00",
				is_group: 1,
				name: "Walk in the park",
				description: "Come for a walk and talk in the park.",
				organiserId: 2,
				online_link: null,
				latitude: 41.38090587280269,
				longitude: 2.1230949898267895,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Actions", {
			[Sequelize.Op.or]: [
				{ name: "BBQ" },
				{ name: "Movie Night" },
				{ name: "Article Reading" },
				{ name: "Buy a book!" },
				{ name: "LQBTQ+ in tech" },
				{ name: "Walk in the park" },
			],
		});
	},
};
