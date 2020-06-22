package main

type gremling struct {
	Count int `json:count`
}

func (p *gremling) count(int) error {
	return p.Count
}
