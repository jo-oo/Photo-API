	// get only the validated data from the request
	const validData = matchedData(req);

	try {
		const updatedBook = await book.save(validData);
		debug("Updated book successfully: %O", updatedBook);

		res.send({
			status: 'success',
			data: {
				book,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating a new book.',
		});
		throw error;
	}