import Contact from '../models/Contact.js';

export async function list(req, res) {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    res.json(contacts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function getOne(req, res) {
  try {
    const contact = await Contact.findById(req.params.id).lean();
    if (!contact) return res.status(404).json({ error: 'No encontrado' });
    res.json(contact);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function create(req, res) {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function update(req, res) {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).lean();
    if (!contact) return res.status(404).json({ error: 'No encontrado' });
    res.json(contact);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function remove(req, res) {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: 'No encontrado' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
